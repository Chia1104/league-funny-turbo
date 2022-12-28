import { ChangeEvent, FC, useEffect, useState } from "react";
import { validateHeadShot } from "@wanin/shared/utils";
import { Loading, useToasts } from "@geist-ui/core";
import { UploadHeadShot } from "@/helpers/api/routes/user";
import Image from "next/image";
interface Props {
  querykey: string;
}

const UploadUserImg: FC<Props> = (props) => {
  const { querykey } = props;
  const [userImage, setUserImage] = useState<string>("");
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadComplete, setUploadComplete] = useState<boolean>(false);
  const [date, setDate] = useState(0);
  const { setToast } = useToasts();

  async function onImageChange(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setUploadComplete(false);
    setIsUploading(true);
    const image = e.target?.files?.[0];
    if (!image) return;
    const validation = validateHeadShot(image);
    if (!validation.success) {
      setIsUploading(false);
      setToast({
        text: validation.error.errors[0].message,
        type: "warning",
      });
      return;
    }
    const formData = new FormData();
    formData.append("image", image);

    const result = await UploadHeadShot(formData);
    if (result.statusCode !== 200) {
      setToast({
        text: result.message || "上傳圖片失敗",
        type: "warning",
      });
      setIsUploading(false);
      return;
    }

    setUploadComplete(true);
    setIsUploading(false);
    setUserImage(result?.data as string);
    return;
  }

  // 新增後綴，讓圖片可正常抓取
  useEffect(() => {
    const date = new Date().getTime();
    setDate(date);
  }, [uploadComplete, userImage]);

  return (
    <>
      <div className="w-[110px] h-[110px] rounded-full bg-white border-2 border-white">
        {!isUploading ? (
          uploadComplete ? (
            <Image
              className="rounded-full"
              width={110}
              height={110}
              src={`${userImage}?date=${date}` as string}
              alt={"userImage"}
            />
          ) : (
            <Image
              className="rounded-full"
              width={110}
              height={110}
              src={`https://img.league-funny.com/user_cover_test/${querykey}.jpg?date=${date}`}
              alt={"userImage"}
            />
          )
        ) : (
          <Loading type="success" />
        )}
      </div>
      <label className="absolute right-0 bottom-1.5 w-8 h-8 rounded-full flex items-center justify-center bg-gray-500 cursor-pointer">
        <input
          type="file"
          accept="image/jpg,image/jpeg,image/png"
          onChange={onImageChange}
          style={{ display: "none" }}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6 text-white">
          <path d="M12 9a3.75 3.75 0 100 7.5A3.75 3.75 0 0012 9z" />
          <path
            fillRule="evenodd"
            d="M9.344 3.071a49.52 49.52 0 015.312 0c.967.052 1.83.585 2.332 1.39l.821 1.317c.24.383.645.643 1.11.71.386.054.77.113 1.152.177 1.432.239 2.429 1.493 2.429 2.909V18a3 3 0 01-3 3h-15a3 3 0 01-3-3V9.574c0-1.416.997-2.67 2.429-2.909.382-.064.766-.123 1.151-.178a1.56 1.56 0 001.11-.71l.822-1.315a2.942 2.942 0 012.332-1.39zM6.75 12.75a5.25 5.25 0 1110.5 0 5.25 5.25 0 01-10.5 0zm12-1.5a.75.75 0 100-1.5.75.75 0 000 1.5z"
            clipRule="evenodd"
          />
        </svg>
      </label>
    </>
  );
};

export default UploadUserImg;
