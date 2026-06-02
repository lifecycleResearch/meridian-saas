// app/login/page.tsx
import LoginForm from "./LoginForm";

export default function LoginPage() {
  return (
    <section className="section">
      <div className="container max-w-md text-center">
        <div className="eyebrow mb-3">Welcome Back</div>
        <div className="ornament"><span className="diamond" /></div>
        <h1 className="font-serif text-4xl text-ink-900 mt-4 mb-2">Sign in</h1>
        <p className="text-ink-500 mb-8">Use Google or a magic link to your email.</p>
        <div className="card p-8 text-left">
          <LoginForm />
        </div>
      </div>
    </section>
  );
}
