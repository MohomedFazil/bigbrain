import GradeDetail from "@/components/root/GradeDetail";

interface Props {
  params: { id: string }
}

const page = async ({ params }: Props) => {
  const { id } = await params;
  return (
    <section>
      <GradeDetail id={id} />
    </section>
  )
}

export default page