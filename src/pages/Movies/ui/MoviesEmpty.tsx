import emptyMovies from '@/app/assets/imgs/emptyMovies.png'

export const MoviesEmpty = () => (
    <>
        <div className="w-[50%] h-[300px] m-auto" style={{ backgroundImage: `url(${emptyMovies})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }} />
    </>
)