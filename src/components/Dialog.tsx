'use client'
import React, { createContext, useContext, useState, ReactNode } from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card"
import { motion } from 'framer-motion';
import { Button } from './ui/button';

// Definindo o tipo para o contexto do diálogo
interface DialogContextType {
  openDialog: (data: ContentDialog) => void;
  closeDialog: (data: ContentDialog) => void;
}

interface ContentDialog {
  title: string,
  content: string,
  isOpen: boolean,
  hasCloseButton: boolean,
  textCloseButton?: string,
  textPositiveButton?: string,
  positiveButton?: boolean,
  onClickPositive?: () => void
}

// Criando o contexto do diálogo
const DialogContext = createContext<DialogContextType>({
  openDialog: () => { },
  closeDialog: () => { },
});

// Hook para acessar o contexto do diálogo
export function useDialog(): DialogContextType {
  return useContext(DialogContext);
}

// Propriedades do provedor do contexto do diálogo
interface DialogProviderProps {
  children: ReactNode;
}

// Provedor do contexto do diálogo
export function DialogProvider({ children }: DialogProviderProps): JSX.Element {
  const [dialog, setDialog] = useState<ContentDialog>({
    content: '', isOpen: false,
    hasCloseButton: true, title: "", positiveButton: false,
    textCloseButton: "", textPositiveButton: ""
  });


  const openDialog = (data: ContentDialog) => {
    setDialog(data);
  };

  const closeDialog = (data: ContentDialog) => {
    setDialog(data);
  };

  return (
    <DialogContext.Provider value={{ openDialog, closeDialog }}>
      {children}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: dialog.isOpen ? 0.4 : 0, scale: dialog.isOpen ? 1 : 0 }}
        transition={{ duration: 0.01 }}
        exit={{ opacity: 0 }}
        className='bg-black w-full h-full absolute top-0 left-0'
      />
      <motion.div
        initial={{ scale: 0, display: 'none' }}
        animate={{ scale: dialog.isOpen ? 1 : 0, display: 'flex' }}
        transition={{ duration: 0.5 }}
        exit={{ scale: 0 }}
        className='absolute top-0 bottom-0 left-0 right-0 w-full h-full flex justify-center items-center'
      >
        <Card className='relative w-1/3 tablet:w-1/2 mobile:w-4/5 h-auto'>
          <CardHeader>
            <CardTitle>{dialog.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <span className='text-sm'>{dialog.content}</span>
          </CardContent>
          <CardFooter className='w-full flex flex-row justify-end items-center'>
            {dialog.positiveButton && (
              <Button
                variant='default'
                onClick={() => dialog.onClickPositive?.()}
              >
                {dialog.textPositiveButton}
              </Button>
            )}

            {dialog.hasCloseButton && (
              <Button
                variant='default'
                onClick={() => closeDialog({ content: '', isOpen: false, title: '', hasCloseButton: true, onClickPositive: () => { } })}
              >
                {dialog.textCloseButton}
              </Button>
            )}
          </CardFooter>
        </Card>
      </motion.div>
    </DialogContext.Provider>
  );
}
