import FileUploadButton from "@/components/fileupload"; // Adjust path if needed

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <FileUploadButton />
    </div>
  );
}