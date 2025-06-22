import Link from 'next/link';
import { KahluaUrl } from './HeaderUrls';

interface Props {
  isHovered: boolean;
  offset: number;
  pathname: string;
  handleLinkClick: (name: string) => void;
  handleHover: () => void;
  handleLeave: () => void;
}

const KahluaDropdown = ({
  isHovered,
  offset,
  pathname,
  handleLinkClick,
  handleHover,
  handleLeave,
}: Props) => {
  if (!isHovered) return null;

  return (
    <div
      className="fixed top-[64px] text-gray-60 h-10 hidden min-[1500px]:flex z-50"
      style={{ right: `${offset - 24}px` }}
      onMouseOver={handleHover}
      onMouseOut={handleLeave}
    >
      <div className="w-full">
        <ul
          className={`gap-[60px] w-full h-full flex flex-row justify-end ${
            pathname === '/recruit' || pathname === '/contributors'
              ? 'text-gray-0'
              : ''
          }`}
        >
          {KahluaUrl.map((url) => (
            <li key={url.name}>
              <Link href={url.url}>
                <div onClick={() => handleLinkClick(url.name)}>{url.name}</div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default KahluaDropdown;
