/// JSON list helpers for API envelope data arrays.
List<T> parseList<T>(
  Object? json,
  T Function(Map<String, dynamic> json) fromJson,
) {
  if (json is! List) return [];
  return json
      .whereType<Map<String, dynamic>>()
      .map(fromJson)
      .toList();
}

Map<String, dynamic> asMap(Object? json) {
  if (json is Map<String, dynamic>) return json;
  throw const FormatException('Expected JSON object');
}
