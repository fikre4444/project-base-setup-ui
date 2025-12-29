import { useEffect, useState } from "react";
import { getAccessToken, logout } from "@/lib/auth-store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, LogOut, ShieldCheck } from "lucide-react";
import { API_BASE_URL } from "@/lib/api-config";


export default function Dashboard() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/auth/current-user`, {
      headers: { Authorization: `Bearer ${getAccessToken()}` },
    })
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch(() => logout());
  }, []);

  if (!user) return <div className="h-screen flex items-center justify-center">Loading Profile...</div>;

  return (
    <div className="min-h-screen bg-slate-100">
      <nav className="bg-white border-b px-8 py-4 flex justify-between items-center">
        <h1 className="font-bold text-xl flex items-center gap-2 text-indigo-600">
          <ShieldCheck /> SecureApp
        </h1>
        <Button variant="ghost" onClick={logout} className="text-red-500 hover:bg-red-50">
          <LogOut className="w-4 h-4 mr-2" /> Logout
        </Button>
      </nav>

      <main className="p-8 max-w-4xl mx-auto">
        <div className="grid gap-6">
          <Card className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-none">
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="bg-white/20 p-4 rounded-full"><User size={40} /></div>
              <div>
                <CardTitle className="text-3xl">Welcome, {user.first_name}!</CardTitle>
                <p className="opacity-80">{user.email}</p>
              </div>
            </CardHeader>
          </Card>

          <div className="grid md:grid-cols-2 gap-4">
            <Card><CardHeader><CardTitle className="text-sm uppercase text-slate-500">Account ID</CardTitle></CardHeader>
              <CardContent className="font-mono text-xs">{user.id}</CardContent>
            </Card>
            <Card><CardHeader><CardTitle className="text-sm uppercase text-slate-500">Role</CardTitle></CardHeader>
              <CardContent className="font-bold text-indigo-600">{user.roles[0]}</CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}