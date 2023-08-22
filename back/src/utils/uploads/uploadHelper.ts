import fs from 'fs/promises';
import path from 'path';

export const saveAndManageImage = async (imageBuffer : Uint8Array) : Promise<string> => {
    try{
        const uploadDir = 'ImageUpload';
    const imagePath = path.join(uploadDir, `image_${Date.now()}.png`);

    // Create the directory if it doesn't exist
    try {
      await fs.mkdir(uploadDir, { recursive: true });
    } catch (mkdirError) {
      // Ignore "folder already exists" error
      if (mkdirError.code !== 'EEXIST') {
        throw mkdirError;
      }
    }

    await fs.writeFile(imagePath, imageBuffer);
    return imagePath;
    }catch(error){
        throw error;
    }
};