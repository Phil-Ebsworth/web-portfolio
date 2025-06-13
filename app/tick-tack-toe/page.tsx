import Game from './Game/game';

export default function HomePage() {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', width: '100vw' }}>
            <Game />
        </div>
    );
}