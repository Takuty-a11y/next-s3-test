import { PageLayout } from "@/components/layout";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";
import axios from "axios";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();
  const handleClick = () => {
    router.push("/test");
  };
  const handleApi = async () => {
    await axios
      .get("https://pp1s7ryry1.execute-api.ap-northeast-1.amazonaws.com/dev")
      .then((res) => {
        console.log(res);
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
        onClick={handleApi}
      >
        APIテスト
      </button>
    </PageLayout>
  );
}
