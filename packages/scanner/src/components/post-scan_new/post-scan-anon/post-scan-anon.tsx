import { FC, useEffect } from 'react';
import { useContext } from 'react';

import { AppColor, AppContext } from '~/app-context';
import { GreenAnonCard } from '~/components/misc';
import { useDoFeedVol } from '../post-scan.utils';

export const PostScanAnon: FC<{
    closeFeed: () => void;
}> = ({ closeFeed }) => {
    const { mealTime, setColor } = useContext(AppContext);

    const doFeed = useDoFeedVol(undefined, mealTime, closeFeed);

    useEffect(() => setColor(AppColor.GREEN), []);

    return <GreenAnonCard close={closeFeed} doFeed={doFeed} />;
};
