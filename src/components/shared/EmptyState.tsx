interface EmptyStateProps {
  message: string;
  description?: string;
}

export default function EmptyState({ message, description }: EmptyStateProps) {
  return (
    <div
      role="status"
      className="w-full rounded-xl border border-[#e1e8e1] bg-white p-8 text-center"
    >
      <p className="text-base sm:text-lg font-semibold text-[#1d271f]">
        {message}
      </p>
      {description ? (
        <p className="mt-1 text-sm text-[#1d271f]/65">{description}</p>
      ) : null}
    </div>
  );
}

