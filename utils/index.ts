import jwt from 'jsonwebtoken'

export const utils = {

    format: (num: number) => {
        const formater = new Intl.NumberFormat('en-US', 
            { 
                style: 'currency', 
                currency: 'USD',
                minimumFractionDigits: 2, 
                maximumFractionDigits: 2, 
            }
        );
    return formater.format(num);
    },

    signToken: (_id: string, email: string) => {
        if( ! process.env.JWT_SECRET ) throw new Error('JWT_SECRET not found')
        
        return jwt.sign(
            
            { _id, email }, 
            
            process.env.JWT_SECRET,
            
            { expiresIn: '1d' }
        )
    },
    
     isValidEmail: (email: string): boolean => {
  
  const match = String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
        
        return !!match;
    },
    
    isEmail: (email: string): string | undefined => {
      return utils.isValidEmail(email) 
        ? undefined
        : 'El correo no parece ser válido';
    }
    
}
    

