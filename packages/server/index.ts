import express, { type Request, type Response } from 'express';
import dotenv from 'dotenv';
import z from 'zod';
import { chatService } from './services/chat.service';

dotenv.config();



const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
   res.send('Hello from the server!');
});
app.get('/api/hello', (req: Request, res: Response) => {
   res.send({ message: 'Hello from the server!' });
});



const chatSchema = z.object({
   prompt: z.string()
   .trim()
   .min(1, 'Prompt cannot be empty')
   .max(1000, 'Prompt is too long (max 1000 characters)'),
   conversationId: z.string().uuid()
})


app.post('/api/chat', async (req: Request, res: Response) => {

   const parseResult = chatSchema.safeParse(req.body);
   if (!parseResult.success) {
      res.status(400).json( parseResult.error.format());
      return;
   }
try {
    const { prompt, conversationId } = req.body;
      const response = await chatService.sendMessage(prompt, conversationId);
     res.json({ message: response.message})
   
} catch (error) {
   res.status(500).json({ error: 'Failed to generate a response.' });
}
  

  ;

   

  
});


app.listen(PORT, () => {
   console.log(`Server is running on http://localhost:${PORT}`);
});
