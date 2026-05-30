import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

type PageProps = {
  searchParams: Promise<{ error?: string; callbackUrl?: string }>;
};

async function loginAction(formData: FormData) {
  "use server";

  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirectTo: (formData.get("callbackUrl") as string) || "/admin",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      redirect("/admin/login?error=Invalid email or password");
    }
    throw error;
  }
}

export default async function AdminLoginPage({ searchParams }: PageProps) {
  const params = await searchParams;

  return (
    <div className="admin-login">
      <h1 style={{ marginTop: 0 }}>Admin login</h1>
      {params.error ? <p className="admin-error">{params.error}</p> : null}
      <form action={loginAction} className="admin-form">
        <input type="hidden" name="callbackUrl" value={params.callbackUrl ?? "/admin"} />
        <div className="admin-field">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required autoComplete="username" />
        </div>
        <div className="admin-field">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
          />
        </div>
        <button type="submit" className="admin-btn">
          Sign in
        </button>
      </form>
      <p style={{ marginTop: "1.5rem", fontSize: "0.875rem" }}>
        <Link href="/" style={{ color: "var(--admin-muted)" }}>
          Back to site
        </Link>
      </p>
    </div>
  );
}
