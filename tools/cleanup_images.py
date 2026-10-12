
from pathlib import Path
import argparse
import shutil
import re

PROJECT_ROOT = Path(__file__).resolve().parent.parent
IMAGES_DIR = PROJECT_ROOT / "img"

# Respaldo fuera del repositorio
BACKUP_DIR = PROJECT_ROOT.parent / "birthday-gift-original-images"

SOURCE_FILES = [
    PROJECT_ROOT / "index.html",
    *(PROJECT_ROOT / "css").rglob("*.css"),
    *(PROJECT_ROOT / "js").rglob("*.js"),
]

EXTENSIONS = {".png", ".jpg", ".jpeg"}


def find_candidates():
    candidates = []

    for image_path in IMAGES_DIR.rglob("*"):
        if not image_path.is_file():
            continue

        if image_path.suffix.lower() not in EXTENSIONS:
            continue

        webp_path = image_path.with_suffix(".webp")

        if webp_path.is_file():
            candidates.append(image_path)

    return sorted(candidates)


def is_still_referenced(image_path):
    relative_path = image_path.relative_to(PROJECT_ROOT)
    image_url = relative_path.as_posix()

    for source_file in SOURCE_FILES:
        if not source_file.is_file():
            continue

        content = source_file.read_text(encoding="utf-8")

        # Comprueba rutas literales y rutas relativas.
        if image_url in content:
            return True

        if f"../{image_url}" in content:
            return True

    return False


def main():
    parser = argparse.ArgumentParser()

    parser.add_argument(
        "--apply",
        action="store_true",
        help="Mueve originales a la carpeta de respaldo"
    )

    args = parser.parse_args()

    candidates = find_candidates()
    ready = []
    protected = []

    print("\n=== BIRTHDAY GIFT IMAGE CLEANUP ===")
    print("MODO:", "RESPALDAR" if args.apply else "SIMULACIÓN")

    for image_path in candidates:
        relative_path = image_path.relative_to(PROJECT_ROOT)

        if is_still_referenced(image_path):
            protected.append(image_path)
            print(f"[PROTEGIDA] {relative_path}")
        else:
            ready.append(image_path)
            print(f"[LISTA] {relative_path}")

    print("\n=== RESUMEN ===")
    print(f"Originales encontrados: {len(candidates)}")
    print(f"Listos para respaldar: {len(ready)}")
    print(f"Protegidos por referencias: {len(protected)}")

    if not args.apply:
        print("\nSimulación terminada. No se movió ningún archivo.")
        return

    for image_path in ready:
        relative_path = image_path.relative_to(PROJECT_ROOT)
        destination = BACKUP_DIR / relative_path

        destination.parent.mkdir(parents=True, exist_ok=True)

        if destination.exists():
            print(f"[OMITIDO] Ya existe respaldo: {relative_path}")
            continue

        shutil.move(str(image_path), str(destination))

    print(f"\nRespaldo ubicado en: {BACKUP_DIR}")
    print("Limpieza terminada.")


if __name__ == "__main__":
    main()
