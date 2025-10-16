import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mail, MapPin, Phone, Upload } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("jwt");

  // 🧠 Lấy thông tin người dùng từ Strapi
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(
          "http://localhost:1337/api/users/me?populate=avatar",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!res.ok) throw new Error("Không thể tải thông tin người dùng");
        const data = await res.json();
        setUser(data);
      } catch (err) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [token]);

  // 🖼 Upload avatar mới
  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);

    try {
      // Lấy thông tin user hiện tại để biết id
      const meRes = await fetch("http://localhost:1337/api/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const meData = await meRes.json();
      const userId = meData.id;

      // Chuẩn bị form data theo chuẩn của Strapi
      const formData = new FormData();
      formData.append("files", file);
      formData.append("refId", userId); // id của user
      formData.append("ref", "plugin::users-permissions.user"); // tên model
      formData.append("field", "avatar"); // tên field media trong user

      // Gọi API upload mặc định
      const uploadRes = await fetch("http://localhost:1337/api/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!uploadRes.ok) throw new Error("Cập nhật ảnh đại diện thất bại!");

      // Lấy lại dữ liệu user sau khi upload thành công
      const updatedUserRes = await fetch(
        "http://localhost:1337/api/users/me?populate=avatar",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const updatedUserData = await updatedUserRes.json();

      setUser(updatedUserData);
      toast.success("Cập nhật ảnh đại diện thành công!");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setUploading(false);
    }
  };

  if (loading)
    return <p className="text-center mt-20">Đang tải thông tin...</p>;
  if (!user)
    return (
      <p className="text-center mt-20 text-red-500">
        Không tìm thấy người dùng
      </p>
    );

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-12 ">
        <div className="mx-auto max-w-3xl">
          {/* Page Title */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              My Profile
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Manage your account information and preferences
            </p>
          </div>

          {/* Profile Card */}
          <Card className="mb-6 p-8 border-slate-200">
            <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
              {/* Avatar */}
              <div className="relative">
                <Avatar className="h-24 w-24 border-2 border-border ">
                  <AvatarImage
                    src={
                      user?.avatar?.url
                        ? `http://localhost:1337${user.avatar.url}`
                        : "/placeholder.svg"
                    }
                    alt={user.name}
                  />
                  <AvatarFallback className="text-2xl font-semibold">
                    {user.username
                      ?.split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <label className="absolute bottom-0 right-0 bg-primary text-white p-1.5 rounded-full cursor-pointer hover:bg-primary/90">
                  <Upload className="h-4 w-4" />
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    disabled={uploading}
                  />
                </label>
              </div>

              {/* User Info */}
              <div className="flex-1 text-center sm:text-left">
                <h2 className="text-2xl font-bold text-foreground">
                  {user.username || "Unnamed"}
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {user.email || "No email provided"}
                </p>
              </div>
            </div>
          </Card>

          {/* Contact Information */}
          <Card className="mb-6 p-8 border-slate-200">
            <h3 className="mb-6 text-lg font-semibold text-foreground">
              Contact Information
            </h3>

            <div className="space-y-4">
              <div className="flex items-start gap-3 rounded-lg bg-secondary p-4">
                <Mail className="mt-0.5 h-5 w-5 text-muted-foreground" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">
                    Email Address
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {user.email}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-lg bg-secondary p-4">
                <Phone className="mt-0.5 h-5 w-5 text-muted-foreground" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">
                    Phone Number
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {user.phone}
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Address Information */}
          <Card className="mb-6 p-8 border-slate-200">
            <h3 className="mb-6 text-lg font-semibold text-foreground">
              Shipping Address
            </h3>

            <div className="flex items-start gap-3 rounded-lg bg-secondary p-4">
              <MapPin className="mt-0.5 h-5 w-5 text-muted-foreground" />
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">
                  Default Address
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {user.address}
                </p>
              </div>
            </div>
          </Card>

          {/* Account Actions */}
          <Card className="p-8 border-slate-200 mb-6">
            <h3 className="mb-6 text-lg font-semibold text-foreground">
              Account Settings
            </h3>

            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full justify-start bg-transparent border-slate-200"
              >
                <Link to="/Change-Password">Change Password</Link>
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start bg-transparent border-slate-200"
              >
                <Link to="/Orders">Order History</Link>
              </Button>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
