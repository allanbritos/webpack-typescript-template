import Age from './lib/test';

function woof(noise: string) {
  console.log(noise);
  const age: number = Age();
}

woof('noise');
