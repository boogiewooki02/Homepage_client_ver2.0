import { toggleList } from './categoryDto';

// 카테고리 토글
export const CategoryToggle = ({
  toggle,
  onToggleChange,
}: {
  toggle: string;
  onToggleChange: (toggle: string) => void;
}) => {
  return (
    <section className="flex flex-col gap-6 pad:flex-row pad:gap-0 mb-6 text-2xl font-semibold justify-between">
      <ul className="flex gap-6">
        {toggleList.map((category) => {
          return (
            <li
              key={category.toggle}
              onClick={() => {
                onToggleChange(category.toggle);
              }}
              className={`cursor-pointer text-xl pad:text-2xl ${toggle === category.toggle ? 'text-black' : 'text-gray-40'}`}
            >
              {category.toggle}
            </li>
          );
        })}
      </ul>
    </section>
  );
};
