export function updateQueryParameters(
  vm: any,
  params: Record<string, string | undefined>
) {
  const nonUndefinedParams = Object.fromEntries(
    Object.entries(params).filter(([_, value]) => value !== "")
  );
  vm.$router.replace({ query: { ...vm.$route.query, ...nonUndefinedParams } });
}
