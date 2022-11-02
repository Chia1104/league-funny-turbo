import { Button, Page } from "@/lib/ui";

const UserDetailPage = ({ params }: { params: { uid: string } }) => {
  return (
    <Page className="w-main w-full">
      <article className="mt-28 w-full">
        <h1>User Detail Page</h1>
        <Button text={params.uid} />
      </article>
    </Page>
  );
};

export default UserDetailPage;
