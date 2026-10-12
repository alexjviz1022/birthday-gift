
from pathlib import Path
import argparse
import re

PROJECT_ROOT = Path(__file__).resolve().parent.parent

SOURCE_FILES = [
    PROJECT_ROOT / "index.html",
    * (PROJECT_ROOT / "css").rglob("*.css"),
    * (PROJECT_ROOT / "js").rglob("*.js"),
]

# Encuentra rutas de imágenes dentro de cadenas y CSS.
IMAGE_PATTERN = re.compile(
    r'(?P<path>(?:\.\./)*img/[\w./-]+\.(?:png|jpg|jpeg))',
    re.IGNORECASE
)


def find_replacements(source_file, content):
    replacements = {}

    for match in IMAGE_PATTERN.finditer(content):
        old_path = match.group("path")

        # Resolver la ruta desde la ubicación del archivo.
        image_path = (source_file.parent / old_path).resolve()

        # Las rutas de JS suelen partir de la raíz del sitio.
        if not image_path.is_file():
            image_path = (PROJECT_ROOT / old_path).resolve()

        # Solo trabajar con imágenes dentro de img/.
        try:
            image_path.relative_to(PROJECT_ROOT / "img")
        except ValueError:
            continue

        webp_path = image_path.with_suffix(".webp")

        if webp_path.is_file():
            new_path = Path(old_path).with_suffix(".webp").as_posix()
            replacements[old_path] = new_path

    return replacements


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--apply",
        action="store_true",
        help="Aplica los cambios de rutas"
    )
    args = parser.parse_args()

    print("\n=== BIRTHDAY GIFT PATH UPDATER ===")
    print("MODO:", "APLICAR" if args.apply else "SIMULACIÓN")

    total_references = 0
    changed_files = 0

    for source_file in SOURCE_FILES:
        if not source_file.is_file():
            continue

        content = source_file.read_text(encoding="utf-8")
        replacements = find_replacements(source_file, content)

        if not replacements:
            continue

        print(f"\nArchivo: {source_file.relative_to(PROJECT_ROOT)}")

        for old_path, new_path in replacements.items():
            print(f"  {old_path}")
            print(f"    -> {new_path}")

            total_references += content.count(old_path)

        if args.apply:
            new_content = content

            for old_path, new_path in replacements.items():
                new_content = new_content.replace(old_path, new_path)

            if new_content != content:
                source_file.write_text(
                    new_content,
                    encoding="utf-8"
                )
                changed_files += 1

    print("\n=== RESUMEN ===")
    print(f"Referencias detectadas: {total_references}")
    print(f"Archivos modificados: {changed_files}")

    if not args.apply:
        print("Simulación terminada. No se modificó ningún archivo.")


if __name__ == "__main__":
    main()
