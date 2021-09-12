import React from "react"
import { Button, useToast, Box, Center, NativeBaseProvider } from "native-base"

export const Example = () => {
 
  return (
    <Button
      onPress={() => {
        toast.show({
          render: () => {
            return (
              <Box bg="teal.500" px={4} py={3} rounded="md" mb={5}>
                Hi, Nice to see you ( ´ ∀ ` )ﾉ
              </Box>
            )
          },
        })
      }}
    >
      Custom Toast
    </Button>
  )
}



export const tosstaAlert=()=>{
    return (
        <Example/>
    );
  }
