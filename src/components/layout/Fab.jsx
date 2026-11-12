import { T } from '@/i18n';
import { TG_URL } from '@/lib/env';
import { IconTelegramFab } from '@/components/ui/Icons';

export default function Fab() {
  return (
    <a className="fab" href={TG_URL} target="_blank" rel="noopener">
      <IconTelegramFab />
      <T k="fab" />
    </a>
  );
}
