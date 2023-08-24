import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from './firebase';

export const uploadImage = async (storeImageFile:Blob,userId:string) => {
    // 乱数でファイル名を作成
    const id = Math.random().toString(32).substring(2);
    const storageRef = ref(storage, `images/${userId}/${id}`);
    try{
        const snapshot = await uploadBytes(storageRef, storeImageFile).then(
            (snapshot) => {
              return snapshot;
            }
          );
          const url = await getDownloadURL(snapshot.ref).then((downloadURL) => {
            return downloadURL;
          });
          return url;
    }catch(e){
        throw new Error(e);
    }
};
