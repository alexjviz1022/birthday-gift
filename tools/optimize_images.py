
from pathlib import Path
from PIL import Image
import argparse

PROJECT_ROOT = Path(__file__).resolve().parent.parent
IMAGES_DIR = PROJECT_ROOT / "img"

EXTENSIONS = {".png", ".jpg", ".jpeg"}
MIN_SIZE_BYTES = 1024 * 1024
WEBP_QUALITY = 85


def find_large_images():
    images = []

    for image_path in IMAGES_DIR.rglob("*"):
        if not image_path.is_file():
            continue

        if image_path.suffix.lower() not in EXTENSIONS:
            continue

        if image_path.stat().st_size >= MIN_SIZE_BYTES:
            images.append(image_path)

    return sorted(images)


def optimize_image(image_path, apply_changes=False):
    webp_path = image_path.with_suffix(".webp")
    original_size = image_path.stat().st_size

    if webp_path.exists():
        return "EXISTS", original_size, None

    if not apply_changes:
        return "SIMULATED", original_size, None

    with Image.open(image_path) as image:
        image.save(
            webp_path,
            "WEBP",
            quality=WEBP_QUALITY,
            method=6
        )

    optimized_size = webp_path.stat().st_size

    if optimized_size >= original_size:
        webp_path.unlink()
        return "NO_SAVINGS", original_size, optimized_size

    return "CONVERTED", original_size, optimized_size


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--apply",
        action="store_true",
        help="Genera las imágenes WebP"
    )
    args = parser.parse_args()

    images = find_large_images()

    total_original = 0
    total_optimized = 0
    converted = 0

    print("\n=== BIRTHDAY GIFT IMAGE OPTIMIZER ===")
    print("MODO:", "CONVERSIÓN" if args.apply else "SIMULACIÓN")

    for image_path in images:
        status, original_size, optimized_size = optimize_image(
            image_path,
            apply_changes=args.apply
        )

        relative_path = image_path.relative_to(PROJECT_ROOT)
        webp_path = image_path.with_suffix(".webp")

        print(f"\n{relative_path}")
        print(f"  Destino: {webp_path.relative_to(PROJECT_ROOT)}")
        print(f"  Estado: {status}")

        if status == "CONVERTED":
            converted += 1
            total_original += original_size
            total_optimized += optimized_size

    print("\n=== RESUMEN ===")
    print(f"Imágenes candidatas: {len(images)}")
    print(f"Imágenes convertidas: {converted}")

    if converted:
        savings = (1 - total_optimized / total_original) * 100

        print(f"Peso original: {total_original / 1024**2:.2f} MB")
        print(f"Peso WebP: {total_optimized / 1024**2:.2f} MB")
        print(f"Ahorro: {savings:.1f}%")

    print("\nLas imágenes originales permanecen intactas.")


if __name__ == "__main__":
    main()
