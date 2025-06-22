import Link from 'next/link';
import { Url } from './HeaderUrls';
import { useRouter } from 'next/navigation';

interface DesktopNavBarProps {
  pathname: string;
  handleLinkClick: (name: string) => void;
}

const DesktopNavBar = ({ pathname, handleLinkClick }: DesktopNavBarProps) => {
  const router = useRouter();

  return (
    <ul className="hidden min-[1500px]:flex flex-row gap-[64px]">
      {Url.map((url) => (
        <li
          key={url.name}
          className={`font-medium text-center text-[18px] leading-6 ${
            pathname === url.url ? 'text-primary-50' : ''
          }`}
        >
          {url.name === 'TICKET' ? (
            <div
              className="cursor-pointer"
              onClick={() => router.push('/ticket')}
            >
              {url.name}
            </div>
          ) : (
            <Link href={url.url} passHref>
              <div onClick={() => handleLinkClick(url.name)}>{url.name}</div>
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
};

export default DesktopNavBar;
