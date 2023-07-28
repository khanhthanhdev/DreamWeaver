'use client'


import axios from 'axios'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import Heading from '@/components/heading'
import { ImageIcon} from 'lucide-react'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { formSchema } from './constants'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import Empty from '@/components/empty'
import Loader from '@/components/loader'
import { cn } from '@/lib/utils'
import UserAvatar from '@/components/user-avatar'
import BotAvatar from '@/components/bot-avatar'
import ReactMarkdown from "react-markdown"

const ImagePage = () => {

    const router = useRouter();
    const [images, setImages] = useState<string[]>([]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: "",
            amount: "1",
            resolution: "512x512",
        }
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setImages([]);
            const response = await axios.post('/api/image', values);

            const urls = response.data.map((image: {url: string}) => image.url)

            setImages(urls);
            form.reset();

        } catch (error: any) {
            // Open Pro Model here
            console.log(error)
        } finally {
            router.refresh()
        }
    }

  return (
    <div>
        <Heading
            title='Image Generation'
            description='Turn your imagination into reality with AI'
            icon={ImageIcon}
            iconColor='text-pink-700'
            bgColor='bg-pink-700/10'
        />
        <div className='px-4 lg:px-8'>
            <div>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className='rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2'
                    >
                        <FormField
                            name='prompt'
                            render={({ field}) => (
                                <FormItem className='col-span-12 lg:col-span-10'>
                                    <FormControl className='m-0 p-0'>
                                        <Input 
                                            className='border-0 outline-none
                                            focus-visible:ring-0 focus-visible:ring-transparent
                                            '
                                            disabled={isLoading}
                                            placeholder='A cat sleep in sofa'
                                            {...field}
                                            
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField 
                            name='amount'
                            control={form.control}
                            render={({ field }) => (
                                <FormItem className='col-span-12 lg:col-span-2'>
                                    
                                </FormItem>
                            )}
                        />
                        <Button className='col-span-12 lg:col-span-2 w-full' disabled={isLoading}>
                            Ask AI
                        </Button>
                    </form>
                </Form>
            </div>
            <div className='space-y-4 mt-4'>

                {isLoading && (
                    <div className='p-20'>
                        <Loader />
                    </div>

                )}

                {images.length === 0 && !isLoading && (
                    <Empty label="No images created" />
                )}
                <div>
                    Image will be generated here
                </div>
            </div>
        </div>
    </div>
  )
}

export default ImagePage