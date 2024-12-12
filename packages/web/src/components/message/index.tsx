interface IMessageProps {
  text: string;
}

export function Message({ text }: IMessageProps) {
  return <p className="text-gray-500">{text}</p>;
}