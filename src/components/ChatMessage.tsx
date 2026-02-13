type Props = {
  user: string;
  message: string;
};

export default function ChatMessage({ user, message }: Props) {
  return (
    <div className="chat-message">
      <strong>{user}</strong>
      <span>{message}</span>
    </div>
  );
}
