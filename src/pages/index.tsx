import { PageLayout } from "@/components/layout";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();
  const handleClick = () => {
    router.push("/test");
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
    </PageLayout>
  );
}
