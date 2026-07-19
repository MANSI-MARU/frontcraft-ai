type BadgeProps = {
    text: string;
};

export default function Badge({
    text,
}: BadgeProps) {
    return (
        <span className="rounded-full border px-4 py-1 text-sm">
            {text}
        </span>
    );
}