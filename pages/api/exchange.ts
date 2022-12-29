import { NextApiRequest, NextApiResponse } from 'next'
// import { tagApiRoutes } from '../../lib/tagApiRoutes'
// import { tagUserClient } from '../../lib/tagUserClient'

const interestsData = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        // const client = axios.create()


        var myHeaders = new Headers();
        myHeaders.append("apikey", "cBrMzknq6ih5LXvqSb2NdUnino3X0fTc");

        var requestOptions: RequestInit = {
            method: 'GET',
            redirect: 'follow',
            headers: myHeaders
        };


        const response = await fetch("https://api.apilayer.com/exchangerates_data/latest?symbols=EUR&base=CZK", requestOptions)
        const data = await response.json();
        // return dat;
        // const interests = await axios.get(tagApiRoutes.interests())

        return res.status(200).json({ ...data })
    } catch (error: any) {
        return res.status(error?.status || 401).send(error.message)
    }
}

export default interestsData
