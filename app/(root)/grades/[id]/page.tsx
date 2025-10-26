import GradeDetail from "@/components/root/GradeDetail";

interface Props {
  params: { id: string }
}

const page = async ({ params }: Props) => {
  const { id } = await params;
  console.log("Grade ID in page component:", id);
  return (
    <section>
      <GradeDetail id={id} />
    </section>
  )
}

export default page