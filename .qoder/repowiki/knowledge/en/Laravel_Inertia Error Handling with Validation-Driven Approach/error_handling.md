## Overview

The SmartExam web application uses Laravel's built-in exception and validation framework combined with Inertia.js for client-side error presentation. Error handling follows Laravel conventions with Form Request validation, automatic error propagation to React components via Inertia shared data, and toast notifications for user feedback.

## Backend Error Handling Architecture

### Exception Configuration (`bootstrap/app.php`)

The application configures exception handling through Laravel's `withExceptions()` method:

```php
->withExceptions(function (Exceptions $exceptions): void {
    $exceptions->shouldRenderJsonWhen(
        fn (Request $request) => $request->is('api/*'),
    );
});
```

This ensures API requests receive JSON error responses while web requests use standard Laravel error rendering.

### Validation-Driven Error Flow

Errors are primarily handled through **Form Request classes** rather than manual try-catch blocks:

- **`ProfileUpdateRequest`** — extends `Illuminate\Foundation\Http\FormRequest`, uses `ProfileValidationRules` trait
- **`PasswordUpdateRequest`**, **`TwoFactorAuthenticationRequest`**, **`ProfileDeleteRequest`** — similar pattern

Controllers type-hint these requests and call `$request->validated()` to access sanitized data. If validation fails, Laravel automatically:
1. Redirects back with errors
2. Flashes validation errors to the session
3. Inertia middleware shares errors as props to React components

### Validation Rules Organization

Reusable validation logic is extracted into traits:

- **`App\Concerns\ProfileValidationRules`** — defines `profileRules()`, `nameRules()`, `emailRules()`
- **`App\Concerns\PasswordValidationRules`** — password-specific validation rules

Example from `ProfileValidationRules`:
```php
protected function emailRules(?int $userId = null): array
{
    return [
        'required', 'string', 'email', 'max:255',
        $userId === null
            ? Rule::unique(User::class)
            : Rule::unique(User::class)->ignore($userId),
    ];
}
```

### Fortify Actions

Authentication-related validation uses Laravel Fortify actions:

- **`CreateNewUser`** — calls `Validator::make(...)->validate()` directly
- **`ResetUserPassword`** — same pattern for password reset validation

These throw `ValidationException` on failure, which Laravel handles automatically.

## Frontend Error Presentation

### Error Components

Three dedicated React components handle error display:

1. **`InputError`** (`resources/js/components/input-error.tsx`)
   - Displays field-level validation errors below form inputs
   - Renders red text (`text-red-600`) when message is present
   - Returns `null` when no error (no DOM pollution)

2. **`AlertError`** (`resources/js/components/alert-error.tsx`)
   - Displays multiple errors in an alert box with `AlertCircleIcon`
   - Deduplicates errors using `Set`
   - Uses shadcn/ui `Alert` component with `destructive` variant

3. **Toast Notifications** (`resources/js/hooks/use-flash-toast.ts`)
   - Listens to Inertia's `flash` event
   - Displays success/error/info/warning toasts via `sonner` library
   - Types defined in `FlashToast` interface: `{ type: 'success' | 'info' | 'warning' | 'error'; message: string }`

### Inertia Form Error Pattern

React pages use Inertia's `<Form>` component with render props to access errors:

```tsx
<Form {...ProfileController.update.form()}>
    {({ processing, errors }) => (
        <>
            <Input name="email" />
            <InputError message={errors.email} />
        </>
    )}
</Form>
```

The `errors` object is automatically populated by Inertia from Laravel's validation failures. No manual error state management is needed.

### Status Messages

Success/status messages are passed as page props (e.g., `status` prop in `ForgotPassword`, `Profile`):

```tsx
{status && (
    <div className="mb-4 text-center text-sm font-medium text-green-600">
        {status}
    </div>
)}
```

Controllers set these via `session()->flash('status', ...)` or `Inertia::flash('toast', ...)`.

## Key Conventions

1. **No manual try-catch in controllers** — rely on Laravel's automatic exception handling and Form Request validation
2. **Validation rules in traits** — reusable across Form Requests and Fortify actions
3. **Errors flow through Inertia** — backend validation errors automatically become React props
4. **Field-level errors via `InputError`** — consistent placement below each input
5. **Multi-error alerts via `AlertError`** — for aggregated error lists
6. **Toast notifications for feedback** — success messages use `Inertia::flash('toast', ...)` with sonner
7. **API vs web differentiation** — API routes return JSON errors; web routes redirect with flashed errors

## Notable Absences

- No custom exception classes defined
- No global error boundary components in React
- No explicit error logging configuration beyond Laravel defaults
- No retry mechanisms or error recovery strategies visible
- Controllers do not manually catch exceptions — delegation to Laravel's handler
