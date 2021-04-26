import {useState, useEffect} from 'react';

const FetchDaily = (initialUrl) => {
    const [result, setResult] = useState(null);
    const [errorDaily, setErrorDaily] = useState(null);
    const [isLoadingDaily, setIsLoadingDaily] = useState(null)
    const [url, setDailyUrl] = useState(initialUrl);

    useEffect(() => {
        if(!url) return;
        setIsLoadingDaily(true);
        setResult(null);
        setErrorDaily(null);

        fetch(url)
        .then((response) => response.json())
        .then((result) => {
            setIsLoadingDaily(false);
            if(result.cod >= 400){
                setErrorDaily(result.message);
                return;
            }
            console.log(result.list)
            setResult(result);
        })
        .catch((error) => {
            setIsLoadingDaily(false)
            setErrorDaily(error)
        });
    }, [url]);

    return { result, errorDaily, isLoadingDaily, setDailyUrl }
}

export default FetchDaily;
