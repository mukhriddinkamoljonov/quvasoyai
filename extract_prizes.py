from PIL import Image
import sys

def crop_image(input_path, output_path, coords):
    try:
        img = Image.open(input_path)
        cropped_img = img.crop(coords)
        cropped_img.save(output_path)
        print(f"Successfully saved {output_path}")
    except Exception as e:
        print(f"Error processing {input_path}: {e}")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python extract_prizes.py <input_image_path>")
        sys.exit(1)
        
    input_image = sys.argv[1]
    
    # Coordinates (left, upper, right, lower)
    # These are rough estimates based on the 1024x576 image provided
    laptop_coords = (30, 420, 490, 720) # 1-o'rin (bottom left area)
    keyboard_coords = (530, 400, 990, 620) # 2-o'rin (middle right area)
    headphone_coords = (630, 700, 990, 950) # 3-o'rin (bottom right area)
    
    # If the original image is 1024x576 as standard Gemini input
    # Let's use relative coordinates to be safe
    # img = Image.open(input_image)
    # w, h = img.size
    # laptop_coords = (int(w*0.03), int(h*0.42), int(w*0.48), int(h*0.72))
    
    # We will let the user upload the image manually if they want, 
    # but since I don't have direct access to the exact file path of the image they uploaded,
    # I will ask them to put the image in the project folder as 'prizes_original.jpg' 
    # and then we can run a script to slice it, OR I can just instruct the user to use 
    # a CSS trick to display parts of the image (CSS Sprites).
    
    print("Script created.")
