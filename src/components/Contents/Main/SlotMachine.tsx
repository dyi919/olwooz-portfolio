import { useEffect, useState } from 'react';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import { ShuffleIcon } from '@/components/Icons';
import { useTranslation } from 'next-i18next';

interface Props {
  textData: string[];
}

interface VariantProps {
  scaleY: number;
  y: string | number;
  opacity: number;
  filter?: string;
}

const BUTTON_COLOR = 'rgb(75, 85, 99)';
const ARRAY_REPEAT = 5;

const SlotMachine = ({ textData }: Props) => {
  const { t } = useTranslation('common');

  const [count, setCount] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const textArr = Array(ARRAY_REPEAT).fill(textData).flat();
  const lastIndex = textArr.length - 1 - count;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        return prev < lastIndex ? prev + 1 : prev;
      });
    }, getDuration(10, currentIndex));

    return () => clearInterval(interval);
  }, [currentIndex, lastIndex, count]);

  const variants: Variants = {
    initial: { scaleY: 0.3, y: '-50%', opacity: 0 },
    animate: ({ isLast }) => {
      let props: VariantProps = { scaleY: 1, y: 0, opacity: 1 };
      if (!isLast) props['filter'] = 'blur(1.5px)';

      return props;
    },
    exit: { scaleY: 0.3, y: '50%', opacity: 0 },
  };

  function handleClick() {
    setCurrentIndex(0);
    setCount((prev) => {
      return prev < textData.length - 1 ? prev + 1 : 0;
    });
  }

  function getDuration(base: number, index: number) {
    return base * (index + 1) * 0.5;
  }

  return (
    <div>
      <AnimatePresence mode="popLayout">
        {textArr.map((text, i) => {
          const isLast = i === lastIndex;

          return (
            i === currentIndex && (
              <motion.p
                className="cursor-pointer overflow-hidden text-7xl font-thin"
                key={text}
                custom={{ isLast }}
                variants={variants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: getDuration(isLast ? 0.1 : 0.01, i), ease: isLast ? 'easeInOut' : 'linear' }}
                onClick={handleClick}
                whileHover={{ opacity: 0.5, transition: { duration: 0.2 } }}
                whileTap={{ scaleY: 0.7, y: '-30%', transition: { duration: 0.2 } }}
              >
                {t(`main.textData.${text}`)}
              </motion.p>
            )
          );
        })}
      </AnimatePresence>
      <motion.button className="absolute left-[160px] top-[49vh]" onClick={handleClick} whileTap={{ scale: 0.9, scaleY: 1 }} whileHover={{ scaleY: -1 }}>
        <ShuffleIcon />
      </motion.button>
    </div>
  );
};

export default SlotMachine;
