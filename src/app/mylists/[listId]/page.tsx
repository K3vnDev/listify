export default async function ListView({ params }: { params: { listId: string } }) {
  const { listId } = await params

  return <h1 className='text-white'>{listId}</h1>
}
