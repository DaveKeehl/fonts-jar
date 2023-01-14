interface INewCollectionForm {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

export const NewCollectionForm = ({ value, onChange, onSubmit }: INewCollectionForm) => {
  return (
    <form className="flex w-full gap-2" onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="New collection name"
        className="w-full text-base placeholder:text-greyscale-400 focus-visible:outline-0"
        value={value}
        onChange={onChange}
      />
      <input
        type="submit"
        value="Add"
        className="rounded bg-green-500 px-[10px] py-1 text-sm font-medium leading-[24px] text-white hover:cursor-pointer hover:bg-green-600 active:bg-green-500 disabled:cursor-not-allowed disabled:bg-green-300"
        disabled={value === ""}
      />
    </form>
  )
}
