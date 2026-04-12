export const frag = /* wgsl */ `
@fragment
fn main(
  @location(0) color: vec3f,
  @location(1) normal: vec3f,
  @location(2) worldPos: vec3f,
) -> @location(0) vec4f {
  let n = normalize(normal);
  let lightDir = normalize(vec3f(0.6, 1.0, 0.5));
  let viewDir = normalize(-worldPos);
  let halfDir = normalize(lightDir + viewDir);

  let ndotl = max(dot(n, lightDir), 0.0);
  let spec = pow(max(dot(n, halfDir), 0.0), 96.0);

  let ambient = 0.12;
  let diffuse = 0.45 * ndotl;
  let specular = 1.2 * spec;

  let baseMetal = color * vec3f(0.55, 0.58, 0.62);
  let litColor = baseMetal * (ambient + diffuse) + vec3f(specular);
  return vec4f(litColor, 1.0);
}
`
