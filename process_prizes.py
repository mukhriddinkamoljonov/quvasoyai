from PIL import Image
import os

def crop_prizes(input_img):
    img = Image.open(input_img)
    w, h = img.size
    
    # Coordinates (left, upper, right, lower) - estimating based on the uploaded image
    # Image is roughly 1024x576
    laptop_coords = (100, 420, 500, 720) 
    keyboard_coords = (540, 400, 980, 620) 
    headphone_coords = (640, 700, 960, 950) 
    
    laptop = img.crop(laptop_coords)
    keyboard = img.crop(keyboard_coords)
    headphone = img.crop(headphone_coords)
    
    # Create images dir if not exists
    os.makedirs('images', exist_ok=True)
    
    laptop.save('images/laptop_real.png')
    keyboard.save('images/keyboard_real.png')
    headphone.save('images/headphone_real.png')
    
    print("Images cropped successfully.")

