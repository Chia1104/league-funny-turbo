import { Button } from "@/lib/ui";

const UserDetailPage = ({ params }: { params: { uid: string } }) => {
  return (
    <article className="mt-28 w-full">
      <h1>User Detail Page</h1>
      <Button text={params.uid} />
    </article>
  );
};

export default UserDetailPage;
