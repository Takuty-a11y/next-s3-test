import { PageLayout } from "@/components/layout";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";
import axios from "axios";
import { useState } from "react";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [text, setText] = useState("Initial");
  const [textPost, setTextPost] = useState("Initial");
  const router = useRouter();
  const handleClick = () => {
    router.push("/test");
  };
  const handleGetApi = async () => {
    await axios
      .get("https://pp1s7ryry1.execute-api.ap-northeast-1.amazonaws.com/dev")
      .then((res) => {
        console.log(res);
        setText(res.data);
      });
  };
  const handlePostApi = async () => {
    await axios
      .post("https://pp1s7ryry1.execute-api.ap-northeast-1.amazonaws.com/dev", {
        param: "sss",
      })
      .then((res) => {
        console.log(res.data);
        setTextPost(res.data);
      });
  };

  return (
    <PageLayout>
      <div className="font-bold text-lg">S3ホスティング練習App</div>
      <button
        type="button"
        className="bg-white rounded-md p-3 text-gray-600 border shadow my-3"
        onClick={handleClick}
      >
        テストページへ
      </button>
      <button
        type="button"
        className="bg-white rounded-md p-3 text-gray-600 border shadow my-3"
        onClick={handleGetApi}
      >
        API GET テスト
      </button>
      <p>{text}</p>
      <button
        type="button"
        className="bg-white rounded-md p-3 text-gray-600 border shadow my-3"
        onClick={handlePostApi}
      >
        API POST テスト
      </button>
      <p>{textPost}</p>
      {/* <ImageForm /> */}
    </PageLayout>
  );
}

const ImageForm = () => {
  // State to store the file
  const [file, setFile] = useState<File | null>(null);

  // State to store the base64
  const [base64, setBase64] = useState<string | null>(null);

  // When the file is selected, set the file state
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    setFile(e.target.files[0]);
  };

  // On click, clear the input value
  const onClick = (e: React.MouseEvent<HTMLInputElement>) => {
    e.currentTarget.value = "";
  };

  // On submit, upload the file
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file) {
      return;
    }

    // Convert the file to base64
    const base64A = await toBase64(file as File);
    setBase64(base64A as string);

    // You can upload the base64 to your server here
    await axios
      .post(
        "https://pp1s7ryry1.execute-api.ap-northeast-1.amazonaws.com/dev",
        {
          param: base64?.split(",")[1],
        },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((res) => {
        console.log(res.data);
        //setTextPost(res.data);
      });

    // Clear the states after upload
    setFile(null);
    //setBase64(null);
  };

  return (
    <>
      <h1>Upload Image</h1>
      <form method="POST" encType="multipart/form-data" onSubmit={handleSubmit}>
        <input
          type="file"
          name="avatar"
          accept="image/*"
          onChange={onFileChange}
          onClick={onClick}
        />
        <button type="submit">Upload</button>
      </form>
      {base64 && (
        <img src={base64} width={300} height={400} alt="Uploaded Image" />
      )}
    </>
  );
};

// Convert a file to base64 string
const toBase64 = (file: File) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();

    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(fileReader.result);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};
