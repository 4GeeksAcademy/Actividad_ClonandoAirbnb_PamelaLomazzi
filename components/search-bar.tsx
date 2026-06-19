interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const SearchBar = ({
  value,
  onChange,
  placeholder = "En cualquier lugar del mundo",
}: SearchBarProps) => {
  return (
    <label className="flex items-center gap-3 rounded-full border border-zinc-200 bg-white px-4 py-3 shadow-sm shadow-zinc-200/70 md:min-w-[420px]">
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 text-zinc-800">
        <path
          d="M10.5 4a6.5 6.5 0 1 0 4.03 11.6l4.44 4.43 1.06-1.06-4.43-4.44A6.5 6.5 0 0 0 10.5 4Z"
          fill="currentColor"
        />
      </svg>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent text-sm font-medium outline-none placeholder:text-zinc-400"
      />
    </label>
  );
};