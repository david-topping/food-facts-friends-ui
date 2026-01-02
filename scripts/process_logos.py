from PIL import Image, ImageChops
import os

input_folder = "."
output_folder = os.path.join(input_folder, "processed_images")
os.makedirs(output_folder, exist_ok=True)
final_size = 500

for filename in os.listdir(input_folder):
    if filename.lower().endswith(("png", "jpg", "jpeg")):
        img_path = os.path.join(input_folder, filename)
        try:
            img = Image.open(img_path).convert("RGBA")
        except Image.UnidentifiedImageError:
            print(f"skipping {filename} (unsupported format)")
            continue

        alpha = img.split()[-1]
        bbox = alpha.getbbox()
        if bbox:
            img = img.crop(bbox)

        img_ratio = img.width / img.height
        if img_ratio > 1:
            new_width = final_size
            new_height = round(final_size / img_ratio)
        else:
            new_height = final_size
            new_width = int(final_size * img_ratio)

        img = img.resize((new_width, new_height), Image.LANCZOS)

        final_img = Image.new(
            "RGBA", (final_size, final_size), (255, 255, 255, 0))
        paste_x = (final_size - new_width) // 2
        paste_y = (final_size - new_height) // 2
        final_img.paste(img, (paste_x, paste_y), img)

        output_path = os.path.join(
            output_folder, f"{os.path.splitext(filename)[0]}.png")
        final_img.save(output_path, "PNG", optimize=True)

        print(f"Processed: {filename} → {output_path}")

print("All supported images processed successfully! Skipped any unsupported files.")
