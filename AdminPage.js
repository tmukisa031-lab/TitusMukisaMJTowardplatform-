import FileUpload from "../components/FileUpload";
import AdminMediaManager from "../components/AdminMediaManager";

export default function AdminPage() {
  return (
    <div className="p-6">
      <h2 className="text-2xl mb-4">Admin Dashboard</h2>
      <FileUpload />
      <AdminMediaManager />
    </div>
  );
}