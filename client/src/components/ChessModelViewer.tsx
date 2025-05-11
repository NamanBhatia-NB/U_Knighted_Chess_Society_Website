const ChessModelViewer = () => (
    <model-viewer
        src="/chess_3d_model.glb"
        alt="A 3D chessboard"
        interaction-prompt="none"
        disable-zoom
        disable-pan
        auto-rotate
        auto-rotate-delay="0"
        camera-controls
        touch-action="none"
        environment-image="neutral"
        exposure="1"
        shadow-intensity="1"
        shadow-softness="1"
        style={{ width: '110%', height: '110%' }}
    ></model-viewer>
);

export default ChessModelViewer;
