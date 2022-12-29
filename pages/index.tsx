import { useCZKExchange } from '../hooks/useCZKExchange';
import { useLocalStorage } from 'usehooks-ts';
import { useEffect, useState } from 'react';
import ClientOnly from '../components/clientOnly';
import { differenceInHours } from 'date-fns';

export default function Home() {
  const [exchangeData, setExchangeData] = useLocalStorage<{
    timestamp: number;
    rates: any;
  } | null>('exchangeCZK', null);
  const [eur, setEur] = useState<number>(0);
  const [czk, setCzk] = useState<number>(1);

  useEffect(() => {
    setEur(
      Math.round((1 * exchangeData?.rates?.EUR + Number.EPSILON) * 100) / 100
    );
  }, [exchangeData]);

  const [selected, setSelected] = useState('');

  // state functions
  const handleConversion = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = Number(e.currentTarget.value);

    if (selected === 'czk') {
      setCzk(Number(e.currentTarget.value));
      setEur(
        Math.round((value * exchangeData?.rates?.EUR + Number.EPSILON) * 100) /
          100
      );
    } else {
      setEur(Number(e.currentTarget.value));
      setCzk(
        Math.round((value / exchangeData?.rates?.EUR + Number.EPSILON) * 100) /
          100
      );
    }
  };

  const { data, error, isLoading } = useCZKExchange({
    enabled:
      !exchangeData ||
      (exchangeData &&
        differenceInHours(
          new Date(exchangeData?.timestamp * 1000),
          new Date()
        ) > 8),
  });

  useEffect(() => {
    if (error) {
      return;
    }
    if (!data) {
      return;
    }
    setExchangeData(data);
  }, [data]);

  return (
    <ClientOnly>
      <div className='bg-white h-screen m-auto w-full md:w-6/12 px-3 py-10 overflow-hidden'>
        {exchangeData?.timestamp ? (
          <p className='mb-6 text-xs'>
            {`Last update: ${new Date(
              exchangeData?.timestamp * 1000
            ).toLocaleString()}`}
          </p>
        ) : null}
        <h1 className='text-2xl font-bold text-gray-700'>1 Czech Koruna equals</h1>
        <h1 className='text-4xl font-bold mb-12 text-gray-900' >
          {exchangeData?.rates?.EUR?.toFixed(3)} EURO
        </h1>
        <div className='w-full  mb-6 relative'>
          <span className='relative'>
            <input
              className='appearance-none block w-full bg-gray-100 text-gray-900 font-bold border border-gray-100 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 hover:border-gray-500'
              pattern='\d*'
              id='inputCZK'
              placeholder='CZK'
              value={czk}
              onFocus={(e) => setSelected('czk')}
              onChange={handleConversion}
            />
            <span className='absolute bottom-3 left-48 font-bold  text-gray-600 w-60 border-l-2 border-neutral-500 px-4'>
              Czech Koruna
            </span>
          </span>
        </div>
        <div className='w-full mb-6'>
          <span className='relative'>
            <input
              className='appearance-none block w-full bg-gray-100 text-gray-900  font-bold border border-gray-100 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 hover:border-gray-500'
              pattern='\d*'
              id='inputEUR'
              placeholder='EUR'
              value={eur}
              onFocus={(e) => setSelected('eur')}
              onChange={handleConversion}
            />
            <span className='absolute bottom-3 left-48 font-bold  text-gray-600 border-l-2 border-neutral-500 px-4'>
              Euro
            </span>
          </span>
        </div>
      </div>
    </ClientOnly>
  );
}
