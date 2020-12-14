import Button from 'components/Button';

const Track = (props: any) => {
  return (
    <div>
      <p>{props.name}</p>
      {props.sequence.map((step: number, index: number) => (
        <Button key={index} id={index} value={step} trackName={props.name}/>
      ))}
    </div>
  )
}

export default Track;
