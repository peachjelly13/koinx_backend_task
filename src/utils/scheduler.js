import cron from 'node-cron';
import  ethereumPrice  from '../controllers/ethereum.controller.js'

cron.schedule('*/10 * * * *', async () => {
    try {  
        await ethereumPrice();
    } catch (error) {
        console.error("Error running scheduled task:", error);
    }
});

