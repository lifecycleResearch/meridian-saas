// app/login/page.tsx
import LoginForm from "./LoginForm";

export default function LoginPage() {
  return (
    <section className="section">
      <div className="container max-w-md">
        <div className="text-center mb-8">
          <h1 className="h-display text-4xl mb-2">Sign in</h1>
          <p className="text-navy-500">Use Google or a magic link to your email.</p>
        </div>
        <div className="card p-8">
          <LoginForm />
        </div>
      </div>
    </section>
  );
}
